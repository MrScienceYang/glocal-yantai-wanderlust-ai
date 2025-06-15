
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from './UserProvider';
import { toast } from 'sonner';
import { Youtube } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AD_DURATION = 15;

export const AdModal = ({ isOpen, onClose }: AdModalProps) => {
  const { addPoints } = useUser();
  const [countdown, setCountdown] = useState(AD_DURATION);

  useEffect(() => {
    if (isOpen) {
      setCountdown(AD_DURATION);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (countdown > 0) {
      toast.warning(`请再观看 ${countdown} 秒！`);
      return;
    }
    addPoints(10);
    toast.success("恭喜！您已获得10积分！");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>赞助商广告</DialogTitle>
          <DialogDescription>
            观看15秒广告即可赚取10积分，用于兑换PDF导出等功能。
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 aspect-video bg-black flex flex-col items-center justify-center text-white rounded-lg">
          <Youtube className="h-16 w-16 mb-4 text-red-600" />
          <p className="text-lg">广告视频正在播放...</p>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} disabled={countdown > 0} className="w-full">
            {countdown > 0 ? `请稍候... (${countdown}s)` : '关闭并领取10积分'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
