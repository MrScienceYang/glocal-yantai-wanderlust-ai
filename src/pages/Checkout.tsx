
import React, { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { useUser } from '@/components/UserProvider';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AddressSelector from '@/components/AddressSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { isLoggedIn, addOrder } = useUser();
  
  const [address, setAddress] = useState({ province: '', city: '', district: '' });
  const [detailedAddress, setDetailedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wechat');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
      return <Navigate to="/shop" />;
  }
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!address.province || !address.city || !address.district || !detailedAddress) {
      toast.error(t('checkout.address_required'));
      return;
    }
    const fullAddress = `${address.province} ${address.city} ${address.district} ${detailedAddress}`;
    const newOrder = addOrder({
      items: cartItems,
      total,
      shippingAddress: fullAddress,
      paymentMethod,
    });

    if (newOrder) {
      toast.success(t('checkout.payment_successful'), {
        description: t('checkout.order_created', { orderId: newOrder.id }),
      });
      clearCart();
      navigate(`/logistics/${newOrder.id}`);
    } else {
      toast.error(t('checkout.order_failed'));
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('checkout.title')}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>{t('checkout.shipping_address')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <AddressSelector value={address} onAddressChange={setAddress} />
                <Input 
                  placeholder={t('checkout.detailed_address_placeholder')}
                  value={detailedAddress}
                  onChange={(e) => setDetailedAddress(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t('checkout.payment_method')}</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wechat" id="wechat" />
                    <Label htmlFor="wechat">{t('checkout.wechat_pay')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alipay" id="alipay" />
                    <Label htmlFor="alipay">{t('checkout.alipay')}</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle>{t('cart.summary')}</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                  <span>{t('cart.total')}</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handlePlaceOrder}>
                  {t('checkout.place_order')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
