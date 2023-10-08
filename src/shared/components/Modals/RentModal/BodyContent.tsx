import { CategoryInput, CountrySelect, Heading } from '../..';
import { STEPS } from './RentModal';

export type BodyContentProps = {
  currentStep?: STEPS;
  categories?: any[];
  categoryInput?: any;
  locationInput?: any;
  setCustomValue?: (id: string, value: any) => void;
};

const BodyContent: React.FC<BodyContentProps> = ({
  currentStep,
  categories,
  categoryInput,
  locationInput,
  setCustomValue,
}) => {
  if (currentStep === STEPS.LOCATION)
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <div>Country select</div>
        <CountrySelect
          value={locationInput}
          onChange={value => setCustomValue!('location', value)}
        />
      </div>
    );

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
              onClick={category => setCustomValue!('category', category)}
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
