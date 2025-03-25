import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
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
}

export function BookingForm({ propertyId, pricePerNight }: BookingFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

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
      setSelectedRange({ from: undefined, to: undefined });
      // You might want to redirect to a booking confirmation page here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleRangeSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setSelectedRange(range);
    if (range.from) setValue('check_in', range.from);
    if (range.to) setValue('check_out', range.to);
  };

  const checkIn = watch('check_in');
  const checkOut = watch('check_out');
  const totalPrice = checkIn && checkOut ? calculateTotalPrice(checkIn, checkOut) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Dates
          </label>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            className="border rounded-md p-4"
            fromDate={new Date()}
          />
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
          />
        </div>

        {totalPrice > 0 && (
          <div className="text-lg font-semibold">
            Total Price: ${totalPrice}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
}