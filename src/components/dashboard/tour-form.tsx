import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TOUR_BADGES, TOUR_CATEGORIES } from '@/modules/tours/constants'
import { itemsToLines, itineraryToJson } from '@/modules/tours/parse-form'
import type { Tour } from '@/payload-types'

const fieldClass = 'flex flex-col gap-1.5'
const textareaClass =
  'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

type Props = {
  tour?: Tour | null
  action: (formData: FormData) => Promise<void>
  deleteAction?: (() => Promise<void>) | null
  submitLabel: string
}

export function TourForm({ tour, action, deleteAction, submitLabel }: Props) {
  return (
    <>
      <form action={action} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Thông tin cơ bản</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <Label htmlFor="title">Tên tour *</Label>
              <Input id="title" name="title" required defaultValue={tour?.title ?? ''} />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input id="slug" name="slug" required defaultValue={tour?.slug ?? ''} placeholder="bac-au" />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="category">Danh mục *</Label>
              <select
                id="category"
                name="category"
                required
                defaultValue={tour?.category ?? 'europe'}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {TOUR_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={fieldClass}>
              <Label htmlFor="region">Vùng / khu vực *</Label>
              <Input id="region" name="region" required defaultValue={tour?.region ?? ''} />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="destination">Điểm đến</Label>
              <Input id="destination" name="destination" defaultValue={tour?.destination ?? ''} />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="duration">Thời lượng</Label>
              <Input id="duration" name="duration" defaultValue={tour?.duration ?? ''} placeholder="12N/11Đ" />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="departureDate">Ngày khởi hành</Label>
              <Input id="departureDate" name="departureDate" defaultValue={tour?.departureDate ?? ''} />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="order">Thứ tự hiển thị</Label>
              <Input id="order" name="order" type="number" defaultValue={tour?.order ?? 0} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold">Giá & hiển thị</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <Label htmlFor="price">Giá (VND)</Label>
              <Input id="price" name="price" type="number" defaultValue={tour?.price ?? ''} placeholder="99900000" />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="priceLabel">Nhãn giá (nếu không có số)</Label>
              <Input id="priceLabel" name="priceLabel" defaultValue={tour?.priceLabel ?? ''} placeholder="Liên hệ" />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="badge">Badge</Label>
              <select
                id="badge"
                name="badge"
                defaultValue={tour?.badge ?? 'none'}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {TOUR_BADGES.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={fieldClass}>
              <Label htmlFor="fallbackEmoji">Emoji fallback</Label>
              <Input id="fallbackEmoji" name="fallbackEmoji" defaultValue={tour?.fallbackEmoji ?? ''} placeholder="🇩🇰" />
            </div>
            <div className={`${fieldClass} md:col-span-2`}>
              <Label htmlFor="imageUrl">URL ảnh</Label>
              <Input id="imageUrl" name="imageUrl" defaultValue={tour?.imageUrl ?? ''} />
            </div>
            <div className={`${fieldClass} md:col-span-2`}>
              <Label htmlFor="externalUrl">Link ngoài (nếu có)</Label>
              <Input id="externalUrl" name="externalUrl" defaultValue={tour?.externalUrl ?? ''} />
            </div>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={Boolean(tour?.featured)}
                className="rounded border-input"
              />
              Tour nổi bật
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold">Chi tiết tour</h2>
          <div className={fieldClass}>
            <Label htmlFor="overview">Tổng quan</Label>
            <textarea id="overview" name="overview" className={textareaClass} rows={4} defaultValue={tour?.overview ?? ''} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="itinerary">Lịch trình (JSON)</Label>
            <textarea
              id="itinerary"
              name="itinerary"
              className={`${textareaClass} font-mono text-xs`}
              rows={8}
              placeholder={'[\n  { "day": "Ngày 1", "title": "...", "description": "..." }\n]'}
              defaultValue={itineraryToJson(tour?.itinerary)}
            />
            <p className="text-xs text-muted-foreground">Mảng JSON: day, title, description</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <Label htmlFor="includes">Bao gồm (mỗi dòng một mục)</Label>
              <textarea id="includes" name="includes" className={textareaClass} rows={5} defaultValue={itemsToLines(tour?.includes)} />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="excludes">Không bao gồm</Label>
              <textarea id="excludes" name="excludes" className={textareaClass} rows={5} defaultValue={itemsToLines(tour?.excludes)} />
            </div>
          </div>
          <div className={fieldClass}>
            <Label htmlFor="terms">Điều khoản</Label>
            <textarea id="terms" name="terms" className={textareaClass} rows={3} defaultValue={tour?.terms ?? ''} />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <Button type="submit">{submitLabel}</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/tours">Hủy</Link>
          </Button>
          {tour?.slug && (
            <Button type="button" variant="ghost" asChild>
              <Link href={`/tour/${tour.slug}`} target="_blank">
                Xem trên web →
              </Link>
            </Button>
          )}
        </div>
      </form>

      {deleteAction && (
        <div className="mt-6 border-t border-border pt-6">
          <form action={deleteAction}>
            <Button type="submit" variant="destructive" size="sm">
              Xóa tour
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
