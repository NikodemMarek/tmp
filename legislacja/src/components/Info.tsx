
import { ChatWindow } from './ChatWindow';

export const InfoPage = () => {
  return (
    <div className="info-page-container">
      <div className="info-page-chat-section"> {/* Adjust height as needed */}
        <ChatWindow />
      </div>
      <div className="info-page-content-section info-page">
        <h2>Jak powstaje ustawa w Polsce?</h2>
        <p>
          W Polsce nowe ustawy mogą zaproponować: Prezydent, Rada Ministrów (rząd), Senat, grupa co najmniej 15 posłów lub komisja sejmowa, a także grupa minimum 100 tysięcy obywateli.
        </p>
        <p>
          W zależności od tego, kto zgłasza projekt, mówimy o projekcie prezydenckim, rządowym, senackim, poselskim lub obywatelskim. Projekt może zmieniać istniejące prawo lub wprowadzać nowe przepisy.
        </p>
        <h3>Sejm</h3>
        <p>
          Projekt ustawy najpierw trafia do Sejmu. Tam jest omawiany i analizowany przez posłów, często z pomocą ekspertów. Sejm rozpatruje projekt w trzech etapach (czytaniach). W trakcie prac można zgłaszać poprawki. Na końcu posłowie głosują nad całością ustawy.
        </p>
        <ol>
          <li>Najpierw można odrzucić cały projekt.</li>
          <li>Później głosuje się nad poprawkami do poszczególnych artykułów.</li>
          <li>Na końcu głosuje się nad całą ustawę.</li>
        </ol>
        <h3>Senat</h3>
        <p>
          Po uchwaleniu przez Sejm, ustawa trafia do Senatu. Senat może ją przyjąć bez zmian, wprowadzić poprawki lub odrzucić. Jeśli Senat nic zrobi przez 30 dni, ustawa przechodzi dalej.
        </p>
        <p>
          Jeśli Senat wprowadzi poprawki lub odrzuci ustawę, Sejm może je odrzucić odpowiednią większością głosów.
        </p>
        <h3>Prezydent</h3>
        <p>
          Ostatni etap to podpis Prezydenta. Prezydent może podpisać ustawę, zawetować ją (czyli odesłać do ponownego rozpatrzenia przez Sejm) lub skierować do Trybunału Konstytucyjnego, jeśli ma wątpliwości co do zgodności z Konstytucją.
        </p>
        <p>
          Jeśli Sejm odrzuci weto Prezydenta większością 3/5 głosów, Prezydent musi ustawę podpisać. Po podpisaniu ustawa jest publikowana i po 14 dniach (chyba że ustalono inaczej) wchodzi w życie.
        </p>
        <h4>Wyjątki</h4>
        <ul>
          <li>Pilne ustawy mogą być rozpatrywane szybciej.</li>
          <li>Ustawy budżetowe i zmiany Konstytucji mają własne, szczególne zasady.</li>
        </ul>
      </div>
    </div>
  )
}
