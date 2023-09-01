import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

const Loader = ({ width }) => {
    const dynamicColumns = () => {
        if (width >= 1288) {
            return 4
        } else if (width < 1288 && width > 975) {
            return 3
        } else if (width <= 975 && width > 600) {
            return 2
        } else if (width <= 600) {
            return 1
        }
    }

    const dynamicWidth = () => {
        if (width >= 1288) {
            return width / 6
        } else if (width < 1288 && width > 975) {
            return width / 4
        } else if (width <= 975 && width > 600) {
            return width / 3
        } else if (width <= 600) {
            return width - 32
        }
    }

    const rows = 2
    const columns = dynamicColumns()
    const coverWidth = dynamicWidth()
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