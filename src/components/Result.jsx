function Result({ photo, album, artist, price }) {
  return (
    <>
			<img src={photo}/>
			<h3>{album}</h3>
			<p>{artist}</p>
			<p>{price}$</p>
    </>
  );
}

export default Result;