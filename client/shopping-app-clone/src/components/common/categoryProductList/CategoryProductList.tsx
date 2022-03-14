import ListElementOne from 'components/common/lists/ListElementOne';
import ProductCardOne from 'components/common/card/ProductCardOne';

const CategoryProductList = () => {
  const subTopicArray = [
    'Bakery',
    'Fruit and vegetables',
    'Meat and fish',
    'Drinks',
  ];

  return (
    <div className='d-flex'>
      <ListElementOne
        listHeader='Best selling products'
        listSubTopicArray={subTopicArray}
      />
      <ProductCardOne pName='dasd' pDesc='asd' price={2} />
    </div>
  );
};

export default CategoryProductList;
