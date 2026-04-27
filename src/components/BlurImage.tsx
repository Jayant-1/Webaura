import { ImgHTMLAttributes, useState } from 'react'
import clsx from 'clsx'

type BlurImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  imgClassName?: string
  placeholder: string
  priority?: boolean
  wrapperClassName?: string
}

export default function BlurImage({
  alt,
  className,
  imgClassName,
  placeholder,
  priority = false,
  src,
  wrapperClassName,
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={clsx('relative overflow-hidden bg-cover bg-center', wrapperClassName)}
      style={{ backgroundImage: `url(${placeholder})` }}
    >
      <img
        {...props}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={clsx(
          'h-full w-full object-cover transition duration-700 ease-out',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-xl',
          className,
          imgClassName,
        )}
      />
    </div>
  )
}
