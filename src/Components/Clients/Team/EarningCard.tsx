import styles from "./team.module.css";

interface Props {
  children: JSX.Element | JSX.Element[] | any;
}
export default function EarningCard({ children }: Props) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className={styles.teamTitle}>Earning</h4>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}
