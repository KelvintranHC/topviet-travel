import { redirect } from 'next/navigation'

export default function PayloadAdminDisabled() {
  redirect('/dashboard')
}
