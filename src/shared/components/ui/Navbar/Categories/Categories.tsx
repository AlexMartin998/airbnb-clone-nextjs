'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { Container } from '../..';
import CategoryBox from './CategoryBox';
import { categories } from './categories';

export type CategoriesProps = {};

const Categories: React.FC<CategoriesProps> = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  // only render this category componente on main page
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto custom-scrollbar">
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
