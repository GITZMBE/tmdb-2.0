import Draggable from "../../ui/Draggable";
import { useRecoilValue } from "recoil";
import { FavoriteMoviesState } from "../../../states";
import Poster from "../../ui/Poster";

function Favorites() {
  const favorites = useRecoilValue(FavoriteMoviesState);

  return favorites && favorites.length ? (
    <div className='py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>Favorites</h2>
      <Draggable>
        <div className='flex gap-4'>
          {favorites.map(
            ({ id, type, imagePath, title, releaseDate, rating }) => (
              <Poster
                key={id}
                id={id}
                type={type}
                imagePath={imagePath}
                title={title}
                releaseDate={releaseDate}
                rating={rating}
              />
            ),
          )}
        </div>
      </Draggable>
    </div>
  ) : (
    <></>
  );
}

export default Favorites;
