
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, className = "", required = false }) => {
  // Format value to match mask
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Start with +7
    let formatted = '+7';
    
    // Add space after +7
    if (digitsOnly.length > 1) {
      formatted += ' ' + digitsOnly.substring(1, 4);
    }
    
    // Add space after area code
    if (digitsOnly.length > 4) {
      formatted += ' ' + digitsOnly.substring(4, 7);
    }
    
    // Add dash after first 3 digits of phone number
    if (digitsOnly.length > 7) {
      formatted += '-' + digitsOnly.substring(7, 9);
    }
    
    // Add dash after next 2 digits
    if (digitsOnly.length > 9) {
      formatted += '-' + digitsOnly.substring(9, 11);
    }
    
    return formatted;
  };

  // When the input receives focus, if it's empty, set it to "+7 "
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!value) {
      onChange('+7 ');
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // If user deletes beyond +7, reset to +7
    if (input.length < 3) {
      input = '+7 ';
    }
    
    // Update with formatted value
    onChange(formatPhoneNumber(input));
  };

  // Ensure value starts with +7 when initialized
  useEffect(() => {
    if (value && !value.startsWith('+7')) {
      onChange(formatPhoneNumber(value));
    }
  }, []);

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      className={className}
      required={required}
      maxLength={16} // +7 999 999-99-99 (16 characters)
    />
  );
};

export default PhoneInput;
