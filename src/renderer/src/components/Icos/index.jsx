import PropTypes from 'prop-types'

const icoTypes = [
    {
        name: 'close',
        value: 'M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z'
    },
    {
        name: 'fullscreen',
        value: 'M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z'
    }
]

const Ico = ({ size, icoType, color }) => {
    const { value } = icoTypes.find((ico) => ico.name === icoType)
    return (
        <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <path d={value} fill={color || '#515151'}></path>
        </svg>
    )
}
Ico.propTypes = {
    size: PropTypes.number,
    icoType: PropTypes.string.isRequired,
    color: PropTypes.string
}

Ico.defaultProps = {
    size: 32,
    color: '#515151'
}

export default Ico
