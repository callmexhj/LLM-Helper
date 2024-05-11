import { OpenAIIco, TongyiIco } from '@renderer/components/ChatBox/components/InputArea/Icos'

export const modelList = [
	{
		name: 'OpenAI',
		icon: <OpenAIIco />,
		versions: [
			{
				value: 'gpt-3.5',
				label: 'GPT-3.5'
			},
			{
				value: 'gpt-4.0',
				label: 'GPT-4'
			}
		]
	},
	{
		name: 'Tongyi',
		icon: <TongyiIco />,
		versions: [
			{
				value: 'qwen-turbo',
				label: 'Turbo'
			},
			{
				value: 'qwen-plus',
				label: 'Plus'
			},
			{
				value: 'qwen-max',
				label: 'Max'
			}
		]
	}
]
