
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  { id: 'jd', name: '京东', icon: '🛒', color: 'bg-red-500' },
  { id: 'pdd', name: '拼多多', icon: '🛍️', color: 'bg-orange-500' },
  { id: 'taobao', name: '淘宝', icon: '🏪', color: 'bg-yellow-500' },
  { id: 'douyin', name: '抖音小店', icon: '🎵', color: 'bg-purple-500' },
  { id: 'glocal', name: '平台自有商城', icon: '🏢', color: 'bg-blue-500' }
];

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectionChange: (platforms: string[]) => void;
  multiSelect?: boolean;
  placeholder?: string;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onSelectionChange,
  multiSelect = false,
  placeholder = "选择平台"
}) => {
  const [open, setOpen] = useState(false);

  const togglePlatform = (platformId: string) => {
    if (multiSelect) {
      if (selectedPlatforms.includes(platformId)) {
        onSelectionChange(selectedPlatforms.filter(id => id !== platformId));
      } else {
        onSelectionChange([...selectedPlatforms, platformId]);
      }
    } else {
      onSelectionChange([platformId]);
      setOpen(false);
    }
  };

  const getSelectedPlatformNames = () => {
    return platforms
      .filter(p => selectedPlatforms.includes(p.id))
      .map(p => p.name)
      .join(', ');
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 justify-between min-w-[200px]"
        >
          <div className="flex items-center space-x-2">
            {selectedPlatforms.length > 0 ? (
              <>
                <span>{getSelectedPlatformNames()}</span>
                {multiSelect && selectedPlatforms.length > 1 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedPlatforms.length}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-600" align="start">
        {multiSelect && (
          <>
            <DropdownMenuItem
              onClick={() => onSelectionChange(platforms.map(p => p.id))}
              className="text-white hover:bg-gray-700"
            >
              全选平台
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSelectionChange([])}
              className="text-white hover:bg-gray-700"
            >
              清除选择
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-600" />
          </>
        )}
        {platforms.map((platform) => (
          <DropdownMenuItem
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className="text-white hover:bg-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{platform.icon}</span>
              <span>{platform.name}</span>
            </div>
            {selectedPlatforms.includes(platform.id) && (
              <Check className="h-4 w-4 text-green-400" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlatformSelector;
