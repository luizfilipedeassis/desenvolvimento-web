import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Logo from '../assets/logoHeader.png'
import Close from '../assets/close.svg'
import Menu from '../assets/hamburguer.svg'
import Champion from '../assets/champion.svg'
import Star from '../assets/star.svg'
import StarOuter from '../assets/starOuter.svg'
import Check from '../assets/check.svg'
import Instagram from '../assets/instagram.svg'
import Facebook from '../assets/facebook.svg'
import Youtube from '../assets/youtube.svg'
import HeroRectangleOne from '../assets/images/rectangleOne.png'
import HeroRectangleTwo from '../assets/images/rectangleTwo.png'
import ProfileIconOne from '../assets/profileOne.svg'
import ProfileIconTwo from '../assets/profileTwo.svg'
import Button from '../components/Button'
import Card from '../components/Card'
import TestimonialCard from '../components/TestimonialCard'
import '../styles/header.css'
import '../styles/utility.css'
import '../styles/hero.css'
import '../styles/solution.css'
import '../styles/testimonials.css'
import '../styles/pricing.css'
import '../styles/contact.css'
import '../styles/footer.css'

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      html.style.overflow = showMobileMenu ? 'hidden' : 'auto'
    }
  }, [showMobileMenu])

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    setFormStatus('loading')
    setFormMessage('')

    const formData = new FormData(form)
    const payload = {
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as { error?: string; message?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Não foi possível enviar sua mensagem.')
      }

      form.reset()
      setFormStatus('success')
      setFormMessage(data.message ?? 'Mensagem enviada com sucesso.')
    } catch (error) {
      setFormStatus('error')
      setFormMessage(
        error instanceof Error ? error.message : 'Não foi possível enviar sua mensagem.',
      )
    }
  }

  return (
    <>
      <header className="header-bg">
        <div className="container py-sm">
          <nav className="flex items-center justify-between">
            <img src={Logo} alt="Logo FitWear" width={220} height={80} />

            <div className="desktop-only">
              <ul className="flex gap-1">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#solution">Soluções</a>
                </li>
                <li>
                  <a href="#testimonials">Depoimentos</a>
                </li>
                <li>
                  <a href="#pricing">Preços</a>
                </li>
                <li>
                  <a href="#contact">Contato</a>
                </li>
              </ul>
            </div>

            <div className="desktop-only">
              <div className="flex items-center">
                <a className="reverse-color ml-lg" href="#">
                  Login
                </a>
                <Button text="Comprar agora" />
              </div>
            </div>

            <div className="mobile-menu">
              {showMobileMenu ? (
                <div className="mobile-menu-content">
                  <div className="container flex">
                    <ul>
                      <li>
                        <a onClick={() => setShowMobileMenu(false)} href="#">
                          Home
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setShowMobileMenu(false)} href="#solution">
                          Soluções
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setShowMobileMenu(false)} href="#testimonials">
                          Depoimentos
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setShowMobileMenu(false)} href="#pricing">
                          Preços
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setShowMobileMenu(false)} href="#contact">
                          Contato
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => setShowMobileMenu(false)}
                          className="reverse-color"
                          href="#"
                        >
                          Login
                        </a>
                      </li>
                    </ul>
                    <span
                      onClick={() => setShowMobileMenu(!showMobileMenu)}
                      className="btn-wrapper"
                    >
                      <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                    </span>
                  </div>
                </div>
              ) : (
                <span
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="btn-wrapper"
                >
                  <img src={Menu} alt="ícone menu" width={24} height={24} />
                </span>
              )}
            </div>
          </nav>
        </div>
      </header>

      <section id="hero">
        <span className="desktop-only">
          <img src={HeroRectangleTwo} alt="Retângulo um tela inicial" />
        </span>
        <img src={HeroRectangleOne} alt="Retângulo dois tela inicial" />

        <div className="container content">
          <p className="desktop-only">FitWear</p>
          <h1>Performance que acompanha seu treino</h1>
          <p>
            Você sabe que, para alcançar o sucesso, é fundamental ter produtos que te
            impulsionem a ir mais longe.
          </p>
          <div className="flex gap-1">
            <span>
              <Button text="Comprar agora" />
            </span>
            <span className="desktop-only">
              <Button text="Veja mais" secondary />
            </span>
          </div>
        </div>
      </section>

      <section className="container" id="solution">
        <header>
          <span>
            <h2>Soluções</h2>
            <span className="desktop-only">
              <h2>Sob medida para você</h2>
            </span>
          </span>
          <p>
            Inovação é com a gente! A <strong>FitWear </strong>
            já conquistou diversos clientes, seja você mais um deles, veja tudo que pode ganhar
            com nossos produtos.
          </p>
        </header>

        <section className="even-columns">
          <Card
            icon={Champion}
            alt="ícone campeão"
            title="Produto Vencedor"
            text="Ideia matadora, nosso time já ganhou diversos clientes com peças confortáveis para treinar e usar no dia a dia."
          />
          <Card
            icon={Champion}
            alt="ícone campeão"
            title="Produto Vencedor"
            text="Tecidos leves, caimento esportivo e acabamento resistente para acompanhar diferentes intensidades de treino."
          />
          <Card
            icon={Champion}
            alt="ícone campeão"
            title="Produto Vencedor"
            text="Coleções unissex com visual minimalista, pensadas para quem quer praticidade sem abrir mão de estilo."
          />
        </section>
      </section>

      <section id="testimonials">
        <header>
          <span>
            <p className="desktop-only">Conselho de quem conhece</p>
            <h2>Cada cliente importa!</h2>
          </span>
          <p>
            Quem já comprou sabe da qualidade das nossas peças. A FitWear combina conforto,
            tecido respirável e estilo esportivo para acompanhar diferentes rotinas de treino.
          </p>
        </header>

        <section className="carousel">
          <div className="carousel-content">
            <TestimonialCard
              image={ProfileIconOne}
              imageAlt="Imagem perfil cliente"
              testimony="A camiseta dry fit virou minha favorita para treinar. Leve, bonita e não incomoda durante os exercícios."
              name="Lucas Mendes"
              role="Aluno de cross training"
              star={Star}
              starOuter={StarOuter}
              rating={4}
            />
            <TestimonialCard
              image={ProfileIconTwo}
              imageAlt="Imagem perfil cliente"
              testimony="Comprei para usar na academia e acabei usando também no dia a dia. O caimento é muito bom."
              name="Rafa Souza"
              role="Corredora amadora"
              star={Star}
              starOuter={StarOuter}
              rating={5}
            />
          </div>

          <div className="carousel-content">
            <TestimonialCard
              image={ProfileIconOne}
              imageAlt="Imagem perfil cliente"
              testimony="A camiseta dry fit virou minha favorita para treinar. Leve, bonita e não incomoda durante os exercícios."
              name="Lucas Mendes"
              role="Aluno de cross training"
              star={Star}
              starOuter={StarOuter}
              rating={4}
            />
            <TestimonialCard
              image={ProfileIconTwo}
              imageAlt="Imagem perfil cliente"
              testimony="Comprei para usar na academia e acabei usando também no dia a dia. O caimento é muito bom."
              name="Rafa Souza"
              role="Corredora amadora"
              star={Star}
              starOuter={StarOuter}
              rating={5}
            />
          </div>
        </section>
      </section>

      <section id="pricing" className="container">
        <header>
          <p className="desktop-only">Planos e preços</p>
          <h2>Nossos planos</h2>
        </header>

        <section className="even-columns gap-1.5">
          <div className="pricing-card">
            <span className="plan">
              <h3>Básico</h3>
              <p>Você tem direito a conhecer uma peça essencial da FitWear.</p>
            </span>
            <h2>Grátis</h2>
            <Button text="Pedir agora" secondary />
            <span className="hr" />
            <span className="features">
              <img src={Check} alt="ícone check" width={24} height={24} />
              <p>Retire na loja</p>
            </span>
            <ul className="features-list">
              <li>
                <img src={Check} alt="ícone check" width={24} height={24} />
                <p>Apenas 1 por CPF</p>
              </li>
            </ul>
          </div>

          <div className="pricing-card premium">
            <span className="bonus">
              <p>1º MÊS COM DESCONTO</p>
            </span>
            <span className="plan">
              <h3>Premium</h3>
              <p>Para quem quer renovar os looks de treino com peças funcionais.</p>
            </span>
            <span className="price">
              <h2>R$ 89,90</h2>
              <p>/mês</p>
            </span>
            <Button text="Pedir agora" />
            <span className="hr" />
            <span className="features">
              <img src={Check} alt="ícone check" width={24} height={24} />
              <p>2 peças por mês</p>
            </span>
            <span className="features">
              <img src={Check} alt="ícone check" width={24} height={24} />
              <p>Camiseta dry fit + bottom</p>
            </span>
            <span className="features">
              <img src={Check} alt="ícone check" width={24} height={24} />
              <p>Desconto em novas coleções</p>
            </span>
          </div>
        </section>
      </section>

      <section id="contact">
        <div className="container">
          <header>
            <p>Envie sua dúvida</p>
            <h2>Entre em contato</h2>
            <p>
              Entre em contato, estamos dispostos a tirar qualquer dúvida, seja um orçamento,
              uma dúvida técnica ou sobre algum de nossos produtos. Estamos à disposição para
              responder.
            </p>
          </header>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input id="email" name="email" type="email" placeholder="Seu melhor Email" required />
            <textarea
              id="message"
              name="message"
              placeholder="Motivo do contato. Ex: Gostei muito do produto X, poderia me enviar um orçamento?"
              rows={2}
              required
            />

            <button className="btn-primary" type="submit" disabled={formStatus === 'loading'}>
              {formStatus === 'loading' ? 'Enviando...' : 'Enviar'}
            </button>

            {formMessage ? (
              <p className={`form-feedback ${formStatus}`}>{formMessage}</p>
            ) : null}
          </form>
        </div>
      </section>

      <footer id="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <img src={Logo} alt="Logo FitWear" width={180} height={52} />
            <span>
              <a href="#" aria-label="Instagram">
                <img src={Instagram} alt="Ícone Instagram" width={20} height={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <img src={Facebook} alt="Ícone Facebook" width={20} height={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <img src={Youtube} alt="Ícone YouTube" width={22} height={20} />
              </a>
            </span>
          </div>

          <nav>
            <h3>Empresa</h3>
            <a href="#">Sobre nós</a>
            <a href="#contact">Fale com a FitWear</a>
            <a href="#testimonials">Depoimentos</a>
          </nav>

          <nav>
            <h3>Funcionalidades</h3>
            <a href="#solution">Performance</a>
            <a href="#pricing">Planos</a>
            <a href="#contact">Atendimento</a>
          </nav>

          <nav>
            <h3>Recursos</h3>
            <a href="#hero">Coleção</a>
            <a href="#pricing">Teste a FitWear</a>
            <a href="#contact">Clientes</a>
          </nav>
        </div>

        <div className="footer-copy">
          <p>
            Feito com amor na aula de Programação Web ©2026 FitWear - Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  )
}
