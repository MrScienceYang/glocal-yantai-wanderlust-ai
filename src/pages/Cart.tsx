
import React from 'react';
import { useCart } from '@/components/CartProvider';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('cart.title')}</h1>
        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-xl text-gray-500 mb-4">{t('cart.empty_cart')}</p>
              <Button asChild>
                <Link to="/shop">{t('cart.go_shopping')}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id}>
                  <CardContent className="flex items-center p-4 gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">¥{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="font-semibold w-24 text-right">¥{(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('cart.summary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span>¥{total.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between text-sm text-gray-500">
                    <span>{t('cart.shipping')}</span>
                    <span>{t('cart.free_shipping')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                    <span>{t('cart.total')}</span>
                    <span>¥{total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">{t('cart.checkout')}</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
