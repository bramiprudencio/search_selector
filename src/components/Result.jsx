function Result({ data }) {
	const price = data.collectionPrice ? `${data.collectionPrice}$` : "Free"; //can also by empty
  return (
    <div className="result" onClick={() => window.open(data.trackViewUrl, "_blank")}>
			<img src={data.artworkUrl100} alt="https://i1.sndcdn.com/artworks-000201806104-c4px4h-t1080x1080.jpg"/>
			<h3>{data.trackName}</h3>
			<p>{data.artistName}</p>
			<p>{price}</p>
    </div>
  );
}

export default Result;