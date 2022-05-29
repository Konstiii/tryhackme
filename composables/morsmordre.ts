import { Ref } from 'vue'

type UseMorsmordre = [Ref<boolean>, (newValue: boolean) => void]

export const useMorsmordre = (initial?: boolean): UseMorsmordre => {
    const state = useState('morsemordre', () => initial ?? false)
    const setState = (newValue: boolean) => state.value = newValue
    return [state, setState]
}
