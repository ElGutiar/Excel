import { ActiveRoute } from '@core/routes/ActiveRoute';

export function filterStorage() {
  const accept = confirm('Do you want to delete this table?')
  if (accept) {
    localStorage.removeItem(`excel:${ActiveRoute.param}`)
    ActiveRoute.navigate('')
  }
}
