import { useState } from 'react'
import styles from './styles.module.scss'
import { Card } from 'antd'
import SystemSettingFrom from './components/SystemSettingForm'
import OpenAIForm from './components/OpenAiForm'
import TongyiForm from './components/TongyiForm'
import PropTypes from 'prop-types'

const Setting = ({ onOpenAIKeyChange, onTongyiKeyChange }) => {
	const [activeModelTabKey, setActiveModelTabKey] = useState('OpenAI')

	const tabList = [
		{
			key: 'OpenAI',
			tab: 'OpenAI'
		},
		{
			key: 'Qianwen',
			tab: '通义千问'
		},
		{
			key: 'Spark',
			tab: '科大讯飞'
		},
		{
			key: 'Wenxin',
			tab: '文心一言'
		}
	]
	const ModelContentList = {
		OpenAI: <OpenAIForm onOpenAIKeyChange={onOpenAIKeyChange} />,
		Qianwen: <TongyiForm onTongyiKeyChange={onTongyiKeyChange} />,
		Spark: <SystemSettingFrom />,
		Wenxin: <SystemSettingFrom />
	}

	const onModelTabChange = (key) => {
		setActiveModelTabKey(key)
	}

	return (
		<div className={styles['setting']}>
			<Card title="程序设置" bordered={false} className={styles['setting-card']}>
				<SystemSettingFrom />
			</Card>
			<Card
				title="模型设置"
				bordered={false}
				className={styles['setting-card']}
				tabList={tabList}
				tabProps={{ size: 'small' }}
				activeTabKey={activeModelTabKey}
				onTabChange={onModelTabChange}
			>
				{ModelContentList[activeModelTabKey]}
			</Card>
		</div>
	)
}

Setting.propTypes = {
	onOpenAIKeyChange: PropTypes.func,
	onTongyiKeyChange: PropTypes.func
}

export default Setting
