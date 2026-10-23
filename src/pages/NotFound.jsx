import { Link } from 'react-router-dom'
import '../styles/pages.css'

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container empty-state">
        <p className="not-found__code" aria-hidden="true">
          4<span>🍕</span>4
        </p>
        <h1>Someone ate this page</h1>
        <p>We looked everywhere — under the cheese, behind the oven. It’s gone.</p>
        <Link to="/" className="btn btn--primary btn--lg">
          Take me home
        </Link>
      </div>
    </section>
  )
}
