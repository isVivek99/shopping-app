import Navbar from 'components/common/navbar/Navbar';
import ListElementOne from 'components/common/lists/ListElementOne';
import RecipeCard from 'components/common/card/RecipeCard';
import 'assets/scss/screens/homepage.scss';
function Homepage() {
  const subTopicArray = [
    'Bakery',
    'Fruit and vegetables',
    'Meat and fish',
    'Drinks',
  ];
  const listHeader = 'Categories';
  return (
    <div className='homepage'>
      <div className='homepage__components'>
        <div className='mb-3 py-lg-3'>
          <Navbar />

          <RecipeCard />
          {/* <ListElementOne
            listSubTopicArray={subTopicArray}
            listHeader={listHeader}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
