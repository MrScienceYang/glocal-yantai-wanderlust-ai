
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Package, Truck, Home } from 'lucide-react';

const LogisticsPage = () => {
  const { t } = useTranslation();
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">{t('logistics.not_found')}</h1>
          <Button asChild>
            <Link to="/profile">{t('logistics.back_to_profile')}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('logistics.title')}</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{t('logistics.order_id')}: {order.id}</span>
              <span className="text-base font-medium text-primary">{order.status}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('checkout.shipping_address')}</h3>
              <p>{order.shippingAddress}</p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('logistics.tracking_info')}</h3>
              <div className="relative pl-6">
                <div className="absolute left-2 h-full border-l-2 border-gray-200"></div>
                {order.logistics.map((log, index) => (
                  <div key={index} className="mb-6 flex items-start">
                    <div className="absolute left-0 -translate-x-1/2 bg-white">
                      {index === order.logistics.length - 1 
                        ? <Truck className="h-5 w-5 text-primary" />
                        : <Package className="h-5 w-5 text-gray-400" />
                      }
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{log.status}</p>
                      <p className="text-sm text-gray-500">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/profile"><Home className="mr-2 h-4 w-4" />{t('logistics.back_to_profile')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LogisticsPage;
