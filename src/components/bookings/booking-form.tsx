import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { DayPicker, DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import 'react-day-picker/dist/style.css';

const bookingSchema = z.object({
  check_in: z.date(),
  check_out: z.date(),
  guests: z.number().min(1, 'At least 1 guest is required'),
  special_requests: z.string().optional(),
}).refine(data => data.check_out > data.check_in, {
  message: "Check-out date must be after check-in date",
  path: ["check_out"],
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  propertyId: string;
  pricePerNight: number;
  onClose?: () => void;
}

export function BookingForm({ propertyId, pricePerNight, onClose }: BookingFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const calculateTotalPrice = (checkIn: Date, checkOut: Date) => {
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights * pricePerNight;
  };

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to make a booking');

      const totalPrice = calculateTotalPrice(data.check_in, data.check_out);

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          property_id: propertyId,
          user_id: user.id,
          check_in: format(data.check_in, 'yyyy-MM-dd'),
          check_out: format(data.check_out, 'yyyy-MM-dd'),
          total_price: totalPrice,
          guests: data.guests,
          special_requests: data.special_requests || '',
        }]);

      if (bookingError) throw bookingError;
      
      // Reset form and show success message
      setSelectedRange(undefined);
      onClose?.();
      // You might want to redirect to a booking confirmation page here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleRangeSelect: SelectRangeEventHandler = (range) => {
    setSelectedRange(range);
    if (range?.from) setValue('check_in', range.from);
    if (range?.to) setValue('check_out', range.to);
  };

  const disabledDays = { before: new Date() };
  const footer = selectedRange?.from && selectedRange?.to ? (
    <p className="text-sm text-gray-600 mt-2">
      {`${format(selectedRange.from, 'PPP')} - ${format(selectedRange.to, 'PPP')}`}
    </p>
  ) : (
    <p className="text-sm text-gray-500 mt-2">Please select check-in and check-out dates</p>
  );

  const checkIn = watch('check_in');
  const checkOut = watch('check_out');
  const totalPrice = checkIn && checkOut ? calculateTotalPrice(checkIn, checkOut) : 0;

  const modifiers = React.useMemo(() => ({
    highlighted: selectedRange?.from && selectedRange?.to
      ? { from: selectedRange.from, to: selectedRange.to }
      : undefined
  }), [selectedRange]);

  const modifiersStyles = {
    highlighted: {
      backgroundColor: '#10B981',
      color: 'white',
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Book Your Stay</h3>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Dates
          </label>
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={handleRangeSelect}
              numberOfMonths={2}
              disabled={disabledDays}
              footer={footer}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              classNames={{
                months: "flex gap-4",
                caption: "text-gray-700",
                head_cell: "text-gray-600 text-sm font-semibold",
                cell: "text-sm p-2",
                day: "h-9 w-9 text-sm rounded-md hover:bg-gray-100 transition-colors",
                day_selected: "bg-teal-600 text-white font-semibold hover:bg-teal-700",
                day_today: "text-teal-600 font-semibold",
                day_disabled: "text-gray-300",
              }}
              className="border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Check-in Date
            </label>
            <div className="text-sm text-gray-600">
              {selectedRange?.from ? format(selectedRange.from, 'PPP') : 'Not selected'}
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Check-out Date
            </label>
            <div className="text-sm text-gray-600">
              {selectedRange?.to ? format(selectedRange.to, 'PPP') : 'Not selected'}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            {...register('guests', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            min="1"
          />
          {errors.guests && (
            <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Requests
          </label>
          <textarea
            {...register('special_requests')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            placeholder="Any special requirements or requests..."
          />
        </div>

        {totalPrice > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Price:</span>
              <span className="text-lg font-semibold text-teal-600">${totalPrice}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {`${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`}
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
}