import 'assets/scss/common/card/recipeCard.scss';
import Button from 'components/common/button/Button';
const RecipeCard = () => {
  return (
    <div className='recipe__card'>
      <div className='recipe__card__img__wrapper position-relative'>
        <div className='recipe__overlay'></div>
        <div className='recipe__btn position-absolute'>
          <Button type='sec' size='mid' text='Read recepies' arrow='ra' />
        </div>
        <div className='position-absolute recipe__card__banner'>
          <h3 className='f-12 text-green'>Banner subfocus</h3>
          <h2 className='f-22'>Space for heading</h2>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
