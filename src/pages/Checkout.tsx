import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/components/CartProvider';
import { MapPin, PackageCheck, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  mysteryBox?: boolean;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [orderItems, setOrderItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const orderData = JSON.parse(pendingOrder);
      setOrderItems([orderData.item]);
      setTotal(orderData.totalPrice);
      localStorage.removeItem('pendingOrder');
    } else {
      setOrderItems(cartItems);
      setTotal(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    }
  }, [cartItems]);

  const handlePaymentComplete = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // 检查是否是盲盒订单
      const isMysteryBox = orderItems.some(item => item.mysteryBox);
      
      if (isMysteryBox) {
        navigate('/mystery-box?openBox=true');
      } else {
        // 生成订单ID并跳转到订单详情
        const orderId = 'ORDER' + Date.now();
        navigate(`/order/${orderId}`);
      }
      
      clearCart();
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">结算</CardTitle>
            <CardDescription>请填写您的收货地址和支付信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 订单商品 */}
            <div>
              <h3 className="text-lg font-medium mb-2">订单商品</h3>
              <ul className="border rounded-md divide-y">
                {orderItems.map((item) => (
                  <li key={item.id} className="p-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">
                        {item.quantity ? `数量: ${item.quantity}` : ''}
                      </p>
                      <p className="text-gray-500">¥{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between font-bold">
                <span>总计:</span>
                <span>¥{total}</span>
              </div>
            </div>

            {/* 收货地址 */}
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                收货地址
              </h3>
              <Input
                type="text"
                placeholder="请输入收货地址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* 支付方式 */}
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                支付方式
              </h3>
              <div className="flex space-x-4">
                <Button
                  variant={paymentMethod === 'credit-card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('credit-card')}
                >
                  信用卡
                </Button>
                <Button
                  variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('paypal')}
                  disabled
                >
                  PayPal (暂未开通)
                </Button>
              </div>
            </div>

            {/* 服务保障 */}
            <div className="text-sm text-gray-600 flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
              我们承诺：所有交易均安全可靠，您的支付信息将被加密保护。
            </div>

            {/* 结算按钮 */}
            <Button
              className="w-full gradient-ocean text-white relative"
              onClick={handlePaymentComplete}
              disabled={isProcessing || paymentComplete}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : paymentComplete ? (
                <>
                  <PackageCheck className="mr-2 h-4 w-4" />
                  支付完成!
                </>
              ) : (
                '确认支付'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
