import PropTypes from 'prop-types'

const Card = ({ data }) => {
    return (
        <div className="card">
            <img
                src={data.image}
                loading="lazy"
                alt=""
            />
            <div className="card-body">
                <h4>
                    {data.owner.firstName} {data.owner.lastName}
                </h4>
                <p>
                    {data.text}
                </p>
                <div className="tags">
                    {data.tags.map((tag, idx) => (
                        <span key={idx}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        text: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        owner: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }),
    })
};

export default Card;