export function SpotifySongs({ trackId }) {

  return (
    <div className="overflow-hidden">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export function SpotifyAlbums({ albumId }) {
  return (
    <div className="overflow-hidden">
      <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}} src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
}

export function SpotifyArtists({artistId}) {
  return (
    <div className="overflow-hidden">
      <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}} src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}