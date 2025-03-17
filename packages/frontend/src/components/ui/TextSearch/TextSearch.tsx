import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TextInputProps {
  placeholder: string;
  value: string;
  className?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export default function TextSearch({
  placeholder,
  value,
  onChange,
  className,
}: TextInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
