'use client';

import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import useRentModal from '@/store/useRentModal';
import { Modal } from '..';
import { categories } from '../../ui/Navbar/Categories/categories';
import BodyContent from './BodyContent';

export type RentModalProps = {};

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: React.FC<RentModalProps> = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = useRentModal(s => s.isOpen);
  const onClose = useRentModal(s => s.onClose);

  // // // modal form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  // // keep tracking inputs  <--  CategoryInput
  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  // // to set values and init a re-render  <--  react-hook-form
  const setCustomValue = (id: string, value: any): void => {
    setValue(id, value, {
      shouldValidate: true, // the most importnat
      shouldDirty: true,
      shouldTouch: true,
    });

    console.log(getValues());
  };

  // // // steps
  const onBack = () => setStep(prev => prev - 1);
  const onNext = () => setStep(prev => prev + 1);

  // // labels
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // 1st step do not have go back opt
    if (step === STEPS.CATEGORY) return undefined;

    return 'Back';
  }, [step]);

  // // dynamic body contect based on the current step
  let bodyContent = (
    <BodyContent
      categories={categories}
      categoryInput={category}
      setCustomValue={setCustomValue}
    />
  );
  if (step === STEPS.LOCATION)
    bodyContent = (
      <BodyContent
        currentStep={STEPS.LOCATION}
        locationInput={location}
        setCustomValue={setCustomValue}
      />
    );
  if (step === STEPS.INFO)
    bodyContent = (
      <BodyContent
        currentStep={STEPS.INFO}
        locationInput={location}
        setCustomValue={setCustomValue}
        guestCountInput={guestCount}
        bathroomCountInput={bathroomCount}
        roomCountInput={roomCount}
      />
    );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={onNext}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
