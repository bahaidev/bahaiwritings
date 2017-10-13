<?php

// https://stackoverflow.com/a/39877269/271577
function array_some (array $array, callable $fn) {
    foreach ($array as $value) {
        if ($fn($value)) {
            return true;
        }
    }
    return false;
}

import_request_variables('g', 'g_');

function runPresort (&$tableData, $opts) {
    extract($opts);
    // Todo: Ought to be checking against an aliased table
    if ($presort) {
        usort($tableData, function ($rowA, $rowB) {
            array_some($applicableBrowseFieldNames, function ($fieldName) {
                $idx = array_search($fieldName, $localizedFieldNames);
                $rowAFirst = $rowA[$idx] < $rowB[$idx];
                $rowBFirst = $rowA[$idx] > $rowB[$idx];
                $precedence = $rowBFirst ? 1 : -1;
                return $rowAFirst || $rowBFirst; // Keep going if 0
            });
            return $precedence;
        });
    }
}
runPresort(
    $g_tableData,
    (object) [
        'presort' => $g_presort,
        'applicableBrowseFieldNames' => $g_applicableBrowseFieldNames,
        'localizedFieldNames' => $g_localizedFieldNames
    ]
);

header('Content-type: application/json');

$started = [];
echo json_encode(array_filter($g_tableData, function ($row) {
    // Todo: Wait for start to begin and end to end
    if ($started) {
        $g_endsRaw;

    } else {
        $g_startsRaw;

        $started[] = true;
    }
    return;
});

?>
