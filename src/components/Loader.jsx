import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

const Loader = ({ width }) => {
    const rows = 2
    const columns = width > 960 ? 4 : 3
    const coverWidth = width > 960 ? width / 6.5 : width / 4
    const coverHeight = 300
    const padding = 32
    const speed = 2

    const coverHeightWithPadding = coverHeight + padding
    const coverWidthWithPadding = coverWidth + padding
    const covers = Array(columns * rows).fill(1)

    return (
        <ContentLoader
            speed={speed}
            width={columns * coverWidthWithPadding}
            height={rows * coverHeightWithPadding}
            backgroundColor="#404040"
            foregroundColor="#404040"
        >
            {covers.map((cover, i) => {
                let vy = Math.floor(i / columns) * coverHeightWithPadding
                let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
                return (
                    <rect
                        key={i}
                        x={vx}
                        y={vy}
                        rx="0"
                        ry="0"
                        width={coverWidth}
                        height={coverHeight}
                    />
                )
            })}
        </ContentLoader>
    );
}

Loader.propTypes = {
    width: PropTypes.number
}

export default Loader;