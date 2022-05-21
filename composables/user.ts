import { Ref } from 'vue'
import User from '@/server/utils/database/models/user'

export function useUser(): [Ref<User>, (newValue: User) => void] {
  const state = ref<User>(null)

  const setState = (newValue: User | null) => {
    state.value = newValue
  }
  
  return [state, setState]
}