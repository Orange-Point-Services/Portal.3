-- CUST_PRTL_PriotityDistribution
SELECT CAST(P_NAME AS VARCHAR(100)), TOTAL FROM (
SELECT priority_name AS P_NAME, COUNT(*) AS TOTAL 
FROM VW_DCM_SIMPLECASE
WHERE 1 IN (casestate_isinprocess, casestate_isstart) and priority_name IS NOT NULL
GROUP BY priority_value, priority_name
ORDER BY priority_value DESC)

UNION

SELECT 'TOTAL' AS P_NAME, COUNT(*) AS TOTAL 
FROM VW_DCM_SIMPLECASE
WHERE 1 IN (casestate_isinprocess, casestate_isstart) and priority_name IS NOT NULL
;