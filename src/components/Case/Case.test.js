import Case from './Case'

describe('Case component test', () => {
    it('Case no empty render', () => {
        const wrapper = shallow(<Case />)
        expect(wrapper.isEmptyRender()).toBe(false)
    })
})
