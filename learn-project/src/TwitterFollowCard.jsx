import { useState } from "react";
import PropTypes from "prop-types";

export function TwitterFollowCard({
  children,
  userName,
  name,
  initialIsFollowing,
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const addAt = (userName) => `@${userName}`;

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          alt="avatar"
          src={`https://unavatar.io/${userName}`}
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong>
          <span className="tw-followCard-infoUserName">{addAt(userName)}</span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}

TwitterFollowCard.propTypes = {
  children: PropTypes.node.isRequired,
  userName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initialIsFollowing: PropTypes.bool.isRequired,
};
