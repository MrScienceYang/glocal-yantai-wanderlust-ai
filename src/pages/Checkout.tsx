
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
      return <Navigate to="/shop" />;
  }
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 检查是否有盲盒商品
  const hasMysteryBox = cartItems.some(item => item.mysteryBox);
  
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const boxId = urlParams.get('box_id');
  const returnTo = urlParams.get('return_to');

  const handlePlaceOrder = async () => {
    if (!address.province || !address.city || !address.district || !detailedAddress) {
      toast.error(t('checkout.address_required'));
      return;
    }

    setIsProcessingPayment(true);

    // 模拟支付处理
    setTimeout(() => {
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
        
        // 如果是盲盒订单，跳转回盲盒页面并触发开启动画
        if (hasMysteryBox && returnTo === 'mystery-box' && boxId) {
          navigate(`/mystery-box?payment_completed=true&box_id=${boxId}`);
        } else {
          navigate(`/logistics/${newOrder.id}`);
        }
      } else {
        toast.error(t('checkout.order_failed'));
      }
      
      setIsProcessingPayment(false);
    }, 2000); // 模拟2秒支付处理时间
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('checkout.title')}</h1>
        
        {hasMysteryBox && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-purple-600 mr-3">🎁</div>
              <div>
                <h3 className="font-semibold text-purple-800">盲盒订单</h3>
                <p className="text-purple-600 text-sm">支付完成后将自动开启盲盒，请耐心等待惊喜揭晓！</p>
              </div>
            </div>
          </div>
        )}
        
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
                    <span>
                      {item.name} {item.mysteryBox && '🎁'} x {item.quantity}
                    </span>
                    <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                  <span>{t('cart.total')}</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handlePlaceOrder}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? '正在处理支付...' : t('checkout.place_order')}
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
