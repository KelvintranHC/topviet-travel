import { getTourizaHomeData } from '@/lib/getTourizaData'
import { TourizaHome } from '@/components/touriza/TourizaHome'
import { TourizaShell } from '@/components/touriza/TourizaShell'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const data = await getTourizaHomeData()
  return (
    <TourizaShell data={data}>
      <TourizaHome data={data} />
    </TourizaShell>
  )
}
