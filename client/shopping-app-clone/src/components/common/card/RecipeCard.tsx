import 'assets/scss/common/card/recipeCard.scss';
import Button from 'components/common/button/Button';

interface RecipeCardProps {
  heading: string;
  subheading: string;
  text: string;
  img: string;
}
const RecipeCard = ({
  heading,
  subheading,
  text,
  img,
}: RecipeCardProps): JSX.Element => {
  return (
    <div className='recipe__card'>
      <div className='recipe__card__img__wrapper position-relative'>
        <div className='recipe__overlay'></div>
        <img
          src={require('assets/' + img)}
          alt=''
          className='position-absolute recipe__card__img'
        />
        <div className='recipe__btn position-absolute'>
          <Button
            type='sec'
            size='mid'
            text={text}
            arrow='ra'
            clickHandle={() => console.log('clicked')}
          />
        </div>
        <div className='position-absolute recipe__card__banner'>
          <h3 className='f-12 text-green'>{subheading}</h3>
          <h2 className='f-22'>{heading}</h2>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
