import Image from "next/image"

export function StarseedCentralIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Image
        src="/logos/Square Icon.png"
        alt="Starseed Central"
        fill
        className="object-contain"
      />
    </div>
  )
}