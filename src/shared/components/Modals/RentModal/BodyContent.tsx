import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import {
  CategoryInput,
  Counter,
  CountrySelect,
  Heading,
  ImageUpload,
  Input,
} from '../..';
import { STEPS } from './RentModal';

export type BodyContentProps = {
  currentStep?: STEPS;
  categories?: any[];
  categoryInput?: any;
  locationInput?: any;
  guestCountInput?: any;
  roomCountInput?: any;
  bathroomCountInput?: any;
  imageSrcInput?: any;
  setCustomValue: (id: string, value: any) => void;
  isLoading?: boolean;
  register?: any;
  errors?: any;
};

const BodyContent: React.FC<BodyContentProps> = ({
  currentStep,
  categories,
  categoryInput,
  locationInput,
  bathroomCountInput,
  guestCountInput,
  imageSrcInput,
  roomCountInput,
  setCustomValue,
  isLoading,
  register,
  errors,
}) => {
  // to use this map in ssr & react
  const Map = useMemo(
    () => dynamic(() => import('./../../Map/Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationInput]
  );

  if (currentStep === STEPS.LOCATION)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={locationInput}
          onChange={value => setCustomValue('location', value)}
        />

        <Map center={locationInput?.latlng} />
      </div>
    );

  if (currentStep === STEPS.INFO)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={value => setCustomValue('guestCount', value)}
          value={guestCountInput}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('roomCount', value)}
          value={roomCountInput}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('bathroomCount', value)}
          value={bathroomCountInput}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );

  if (currentStep === STEPS.IMAGES)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrcInput}
        />
      </div>
    );

  if (currentStep === STEPS.DESCRIPTION)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );

  if (currentStep === STEPS.PRICE)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );

  // first step
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-[3px]">
        {categories!.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={categoryInput === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyContent;
