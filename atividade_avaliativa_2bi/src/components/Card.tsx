interface ICardProps {
  icon: string
  alt: string
  title: string
  text: string
}

export default function Card({ icon, alt, title, text }: ICardProps) {
  return (
    <div className="card">
      <span>
        <img src={icon} alt={alt} width={64} height={64} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <hr />
      </div>
    </div>
  )
}
