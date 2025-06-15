
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from './UserProvider';
import { toast } from 'sonner';
import { Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AD_DURATION = 15;

export const AdModal = ({ isOpen, onClose }: AdModalProps) => {
  const { addPoints } = useUser();
  const [countdown, setCountdown] = useState(AD_DURATION);
  const { t } = useTranslation();

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
      toast.warning(t('ad_modal.wait_warning', { seconds: countdown }));
      return;
    }
    addPoints(10);
    toast.success(t('ad_modal.success_message'));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('ad_modal.title')}</DialogTitle>
          <DialogDescription>
            {t('ad_modal.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 aspect-video bg-black flex flex-col items-center justify-center text-white rounded-lg">
          <Youtube className="h-16 w-16 mb-4 text-red-600" />
          <p className="text-lg">{t('ad_modal.video_playing')}</p>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} disabled={countdown > 0} className="w-full">
            {countdown > 0 ? t('ad_modal.wait_button', { seconds: countdown }) : t('ad_modal.claim_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
