'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { airbnbApi } from '@/shared/lib';
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
  const router = useRouter();

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

  // // to set values in form  <--  react-hook-form
  const setCustomValue = (id: string, value: any): void => {
    setValue(id, value, {
      shouldValidate: true, // the most importnat
      shouldDirty: true,
      shouldTouch: true,
    });
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
  if (step === STEPS.IMAGES)
    bodyContent = (
      <BodyContent
        currentStep={STEPS.IMAGES}
        setCustomValue={setCustomValue}
        imageSrcInput={imageSrc}
      />
    );
  if (step === STEPS.DESCRIPTION)
    bodyContent = (
      <BodyContent
        currentStep={STEPS.DESCRIPTION}
        setCustomValue={setCustomValue}
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    );
  if (step === STEPS.PRICE)
    bodyContent = (
      <BodyContent
        currentStep={STEPS.PRICE}
        setCustomValue={setCustomValue}
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    );

  // // // save/submit
  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) return onNext();
    setIsLoading(true);

    airbnbApi
      .post('/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
