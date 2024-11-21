import App_view_case from './App_view_case'

describe('App_view_case component test', () => {
    it('App_view_case no empty render', () => {
        const wrapper = shallow(<App_view_case />)
        expect(wrapper.isEmptyRender()).toBe(false)
    })
})
