import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onStartDateChange(value: string): void;
  onEndDateChange(value: string): void;
  className?: string;
}

export default function DateRange({
  className,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeProps) {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const today = new Date();

  const convertToBackendFormat = (dateString: string): string | undefined => {
    const [day, month, year] = dateString.split('/');
    return day && month && year ? `${month}/${day}/${year}` : undefined;
  };

  const convertToInputFormat = (dateString: string): string | undefined => {
    const [month, day, year] = dateString.split('/');
    return day && month && year ? `${day}/${month}/${year}` : undefined;
  };

  const parseDate = (dateString: string) => {
    const [month, day, year] = dateString.split('/');
    return month && day && year
      ? new Date(`${month}/${day}/${year}`)
      : undefined;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-1/2">
        <Label htmlFor="date-from">From</Label>
        <div className="relative w-full">
          <Input
            id="date-from"
            type="text"
            placeholder="DD/MM/YYYY"
            value={convertToInputFormat(startDate) || ''}
            onChange={e =>
              onStartDateChange(convertToBackendFormat(e.target.value) || '')
            }
            className="pr-10 h-8 text-sm w-full"
          />
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={parseDate(startDate)}
                onSelect={date => {
                  if (date && (!endDate || date <= parseDate(endDate)!)) {
                    onStartDateChange(format(date, 'MM/dd/yyyy'));
                    setOpenFrom(false);
                  }
                }}
                initialFocus
                defaultMonth={parseDate(startDate)}
                disabled={date =>
                  date > today || (endDate ? date > parseDate(endDate)! : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-1/2">
        <Label htmlFor="date-to">To</Label>
        <div className="relative w-full">
          <Input
            id="date-to"
            type="text"
            placeholder="DD/MM/YYYY"
            value={convertToInputFormat(endDate) || ''}
            onChange={e =>
              onEndDateChange(convertToBackendFormat(e.target.value) || '')
            }
            className="pr-10 h-8 text-sm w-full"
          />
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={parseDate(endDate)}
                onSelect={date => {
                  if (date && (!startDate || date >= parseDate(startDate)!)) {
                    onEndDateChange(format(date, 'MM/dd/yyyy'));
                    setOpenTo(false);
                  }
                }}
                initialFocus
                defaultMonth={parseDate(endDate)}
                disabled={date =>
                  date > today ||
                  (startDate ? date < parseDate(startDate)! : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
