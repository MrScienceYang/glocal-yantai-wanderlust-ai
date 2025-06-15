
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from './UserProvider';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { CalendarCheck, Star } from 'lucide-react';

interface DailyCheckInProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyCheckIn = ({ isOpen, onClose }: DailyCheckInProps) => {
  const { checkIn, canCheckIn, consecutiveCheckInDays, checkInRewards } = useUser();
  const { t } = useTranslation();

  const handleCheckIn = () => {
    const pointsEarned = checkIn();
    if (pointsEarned !== null) {
      toast.success(t('check_in.success', { points: pointsEarned }));
    } else {
      toast.info(t('check_in.already_checked_in'));
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('check_in.title')}</DialogTitle>
          <DialogDescription>
            {t('check_in.description')}
            <p className="font-semibold mt-2">{t('check_in.consecutive_days', { days: consecutiveCheckInDays })}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 grid grid-cols-4 gap-3">
          {checkInRewards.map((points, index) => {
            const day = index + 1;
            const isChecked = day <= consecutiveCheckInDays;
            const isToday = day === consecutiveCheckInDays + 1 && canCheckIn;
            return (
              <div
                key={day}
                className={`p-3 border rounded-lg text-center flex flex-col items-center justify-center
                  ${isChecked ? 'bg-green-100 border-green-300' : 'bg-gray-50'}
                  ${isToday ? 'ring-2 ring-ocean-500' : ''}
                  ${!canCheckIn && day === consecutiveCheckInDays ? 'bg-green-100 border-green-300' : ''}
                `}
              >
                <p className="text-sm font-medium">{t('check_in.day', { day })}</p>
                <Star className={`w-6 h-6 my-1 ${isChecked || (day === consecutiveCheckInDays && !canCheckIn) ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
                <p className="text-xs font-bold text-ocean-700">{t('check_in.points', { points })}</p>
              </div>
            );
          })}
           <div
              className={`p-3 border rounded-lg text-center flex flex-col items-center justify-center col-span-1
                ${consecutiveCheckInDays >= 7 ? 'bg-green-100 border-green-300' : 'bg-gray-50'}
              `}
            >
              <p className="text-sm font-medium">{t('check_in.day', { day: 7 })}</p>
              <Star className={`w-6 h-6 my-1 ${consecutiveCheckInDays >= 7 ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} />
              <p className="text-xs font-bold text-ocean-700">{t('check_in.points', { points: checkInRewards[6] })}</p>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCheckIn} disabled={!canCheckIn} className="w-full gradient-ocean text-white">
            <CalendarCheck className="mr-2 h-4 w-4" />
            {canCheckIn ? t('check_in.check_in_now') : t('check_in.checked_in_today')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
