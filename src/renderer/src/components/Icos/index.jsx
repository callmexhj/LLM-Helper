// 由于支持的svg有限，故本组件待废弃

import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const icoTypes = [
	{
		name: 'close',
		value: 'M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z'
	},
	{
		name: 'fullscreen',
		value: 'M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z'
	},
	{
		name: 'minimize',
		value: 'M213.333333 469.333333m21.333334 0l554.666666 0q21.333333 0 21.333334 21.333334l0 42.666666q0 21.333333-21.333334 21.333334l-554.666666 0q-21.333333 0-21.333334-21.333334l0-42.666666q0-21.333333 21.333334-21.333334Z'
	},
	{
		name: 'defaultscreen',
		value: 'M298.666667 631.466667H226.133333v-81.066667h217.6v204.8h-85.333333v-68.266667l-128 128L170.666667 759.466667l128-128z m422.4 0l128 128-59.733334 59.733333-128-128v68.266667h-85.333333V554.666667h217.6v81.066666h-72.533333zM298.666667 341.333333L187.733333 230.4 243.2 170.666667l115.2 115.2V217.6h85.333333v204.8H226.133333V341.333333H298.666667z m430.933333 0h64v81.066667h-217.6V217.6h85.333333v72.533333L780.8 170.666667l59.733333 59.733333L729.6 341.333333z'
	}
]
const Ico = ({ size, icoType, color, isPointer, onClick }) => {
	const { value } = icoTypes.find((ico) => ico.name === icoType)
	const className = isPointer ? styles['ico-pointer'] : ''
	return (
		<div className={className} style={{ width: size, height: size + 10 }} onClick={onClick}>
			<svg
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
			>
				<path d={value} fill={color || '#515151'}></path>
			</svg>
		</div>
	)
}
Ico.propTypes = {
	size: PropTypes.number,
	icoType: PropTypes.string.isRequired,
	color: PropTypes.string,
	isPointer: PropTypes.bool,
	onClick: PropTypes.func
}

Ico.defaultProps = {
	size: 32,
	color: '#515151',
	isPointer: false
}

export default Ico
