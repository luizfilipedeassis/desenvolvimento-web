interface ITestimonialCardProps {
  image: string
  imageAlt: string
  testimony: string
  name: string
  role: string
  star: string
  starOuter: string
  rating: number
}

export default function TestimonialCard({
  image,
  imageAlt,
  testimony,
  name,
  role,
  star,
  starOuter,
  rating,
}: ITestimonialCardProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating)

  return (
    <div className="carousel-card">
      <img src={image} alt={imageAlt} />
      <span className="testimony">
        <p>{testimony}</p>
      </span>
      <span className="rating">
        {stars.map((isFilled, index) => (
          <img
            key={`${name}-${index}`}
            src={isFilled ? star : starOuter}
            alt={isFilled ? 'ícone estrela' : 'ícone estrela sem fundo'}
            width={isFilled ? 22 : 20}
            height={isFilled ? 20 : 22}
          />
        ))}
      </span>
      <span className="names">
        <p>{name}</p>
        <p>{role}</p>
      </span>
    </div>
  )
}
