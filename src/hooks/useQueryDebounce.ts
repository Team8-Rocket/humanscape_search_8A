import { useEffect, useAppDispatch } from 'hooks'
import { setDebouncedText } from 'states/search'

export const useQueryDebounce = (value: string, delay = 600) => {
  const replacedValue = value.replaceAll(' ', '')
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      if (value) {
        dispatch(setDebouncedText(replacedValue))
      }
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, dispatch, replacedValue])
}
